// const posts = [
//   {
//     id: 1,
//     title: "Boost your conversion rate",
//     href: "#",
//     description:
//       "Illo sint voluptas. Error voluptates culpa eligendi. Hic vel totam vitae illo. Non aliquid explicabo necessitatibus unde. Sed exercitationem placeat consectetur nulla deserunt vel. Iusto corrupti dicta.",
//     date: "Mar 16, 2020",
//     datetime: "2020-03-16",
//     category: { title: "Marketing", href: "#" },
//     author: {
//       name: "Michael Foster",
//       role: "Co-Founder / CTO",
//       href: "#",
//       imageUrl:
//         "https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
//     },
//   },
//   // More posts...
// ];
import { parseDate } from "@/utils/parseDateTime";
const fetchUserPosts = async (id: string) => {
  const fetchHostUrl = `http://localhost:3001/api/orchid/getPosts?profileId=${id}`;
  console.log('this is fetch url', fetchHostUrl)
  const data = await fetch(fetchHostUrl);
  console.log(data, 'response coming')
  return data.json();
};

export default async function Blog({ profileId }: { profileId: string }) {
  const { data } = await fetchUserPosts(profileId);
  console.log(data, 'data')
  return (
    <div className="bg-white pt-2 pb-32 sm:pb-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto mt-10 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 border-t border-gray-200 pt-10 sm:mt-16 sm:pt-16 lg:mx-0 lg:max-w-none lg:grid-cols-3">
          {(data || []).map((post) => (
            <article
              key={post._id}
              className="flex max-w-xl flex-col items-start justify-between"
            >
              <div className="flex items-center gap-x-4 text-xs">
                <time dateTime={post.createdAt} className="text-gray-500">
                  {parseDate(post.createdAt)}
                </time>
                {post.tags.slice(0, 2).map((tag) => (
                  <>
                    <a
                      href={`/tags/${tag}`}
                      className="relative z-10 rounded-full bg-gray-50 px-3 py-1.5 font-medium text-gray-600 hover:bg-gray-100"
                    >
                      #{tag}
                    </a>
                  </>
                ))}
              </div>
              <div className="group relative">
                <h3 className="mt-3 text-lg font-semibold leading-6 text-gray-900 group-hover:text-gray-600">
                  <a href={post.postData.rurl}>
                    <span className="absolute inset-0" />
                    {post.postData.title}
                  </a>
                </h3>
                <p className="mt-5 line-clamp-3 text-sm leading-6 text-gray-600">
                  {post.postData.subheading}
                </p>
              </div>
              <div className="relative mt-8 flex items-center gap-x-4">
                <img
                  src={post.author.profileImageUrl}
                  alt=""
                  className="h-10 w-10 rounded-full bg-gray-50"
                />
                <div className="text-sm leading-6">
                  <p className="font-semibold text-gray-900">
                    <a href={`@${post.author.handle}`}>
                      <span className="absolute inset-0" />
                      {post.author.firstName || post.author.handle}
                    </a>
                  </p>
                  <p className="text-gray-600">{post.author.headLine}</p>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}
