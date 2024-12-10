const Post = require("../models/post.model");
const mongoose = require('mongoose');
const { createWebsite, loadWebsite } = require("../queries");

const domainName = process.env.NODE_ENV === 'development' ? 'http://localhost:3001/' : 'https://truescale.in/'
class PostRefine {
  constructor(user, author, post) {
    this.username = author.handle;
    this.blockData = post.blockData;
    this.tags = post.tags;
    this.parseBlockData = this.parseBlockData.bind(this);
    this.getPostMeta = this.getPostMeta.bind(this);
    this.savePost = this.savePost.bind(this);
    this.setPost = this.setPost.bind(this);
    this.removeHtml = this.removeHtml.bind(this);
    this.post = post;
    this.author = author;
  }

  setPost = (name, value) => {
    this.post[name] = value;
  }

  static getPostBreadCrumb(username, id, titleSlug) {
    const postLocation = ['Home', `@${username}`, `${titleSlug}-${id}`]
    return postLocation
  }

  static getPostUrl(username, id, titleSlug) {
    const postUrl = `@${username}/${titleSlug}-${id}`;
    return postUrl
  }


  removeHtml(textData) {
    return textData
      .replaceAll(/<([\w\-/]+)( +[\w\-]+(=(('[^']*')|("[^"]*")))?)* *>/g, "")
      .replaceAll("&nbsp;", "");
  }

  trimWords(w, l) {
    let len = w.length;
    let minC = l > len ? len : l;
    let c = 0;
    let d = '';
    while (c < minC) {
      d = d.concat(w[c]);
      c++;
    }
    return d;
  }

  parseBlockData() {
    const postData = {};
    const blockData = this.blockData;
    for (const item of blockData) {
      let itemType = item.type;
      if (!postData[itemType]?.length) {
        if (itemType === "image") {
          postData[itemType] = item?.data?.file?.url || null;
        } else {
          postData[itemType] = item?.data?.text || null;
        }
      }
    }
    postData.paragraph = this.removeHtml(postData.paragraph);
    postData.paragraph = this.trimWords(postData.paragraph, 150);
    if (!postData.header) {
      postData.header = this.trimWords(postData.paragraph, 20);
    }
    return {
      image: postData.image,
      subheading: postData.paragraph,
      title: postData.header,
    };
  }

  getPostMeta(postId) {
    const postData = this.parseBlockData();
    const id = postId || new mongoose.Types.ObjectId();
    const titleSlug = (postData.title || '').replace(/[^a-zA-Z0-9]+/g, '-');
    const postUrl = PostRefine.getPostUrl(this.username, id, titleSlug);
    const breadCrumb = PostRefine.getPostBreadCrumb(this.username, id, titleSlug);
    // const postType = PostRefine.getPostType();
    postData.url = 'https://truescale.in/' + postUrl;
    postData.rurl = postUrl;
    const author = this.author;
    const postBody = this.post;
    return { _id: id, author, ...postBody, postData };
  }

  async createWebsite(params) {
    let analyticsMeta;
    try {
      analyticsMeta = await createWebsite(params);
    } catch (e) {
      throw new Error("Error in creating analytics");
    }
    return analyticsMeta;
  }

  async createPost() {
    const data = {};
    try {
      const metaData = this.getPostMeta();
      const website = await this.createWebsite({
        name: metaData.postData.title,
        domain: metaData.postData.url,
        profile: metaData._id,
      });

      const post = await this.savePost({ ...metaData, trackerId: website.id });
      data.post = post;
      return data;
    } catch (e) {
      data.error = e.message;
    }
  }

  async editPost(postId) {
    const data = {};
    try {
      const metaData = this.getPostMeta(postId);
      const post = await this.updatePost({ ...metaData, postId });
      data.post = post;
    } catch (e) {
      data.error = e.message;
    }
    return data;
  }

  async updatePost(data) {
    //const postId = this.post._id;
    const postId = data.postId;
    try {
      const post = await Post.findByIdAndUpdate({ _id: postId }, { $set: { "blockData": data.blockData, "tags": data.tags, "postData": data.postData } });
      if (!post) {
        throw new Error("Error in saving post");
      }
      return post;
    } catch (e) {
      throw new Error(e, "Error in Saving");
    }
    //const post = Post.updateOne({});
    //await post.save();
  }

  async savePost(data) {
    const post = new Post({ ...data });
    await post.save();
    return post;
  }
};

module.exports = PostRefine;
