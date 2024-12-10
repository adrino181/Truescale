// -> Home 
// -> Trending
// -> Trending/Tag
// -> About Us
// -> Product 
// -> Profile
// -> Groups
// -> Jobs
// -> Events
// -> Creator/Startup/Publisher
import { baseUrl } from "@/components/services/Api";

function generateSiteMap(posts) {
  return `<?xml version="1.0" encoding="UTF-8"?>
   <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
     <!--We manually set the two URLs we know already-->
     <url>
       <loc>https://www.truescale.in/login</loc>
     </url>
     <url>
      <loc>https://www.truescale.in/signup</loc>
     </url>
     ${posts.map(({ postData }) => {
    return `
      <url>
          <loc>${`${postData.url}`}</loc>
      </url>
    `;
  })
      .join('')}
   </urlset>
 `;
}

function SiteMap() {
  // getServerSideProps will do the heavy lifting
}

export async function getServerSideProps({ res }) {

  res.setHeader(
    'Cache-Control',
    'public, s-maxage=10, stale-while-revalidate=59'
  )

  // We make an API call to gather the URLs for our site
  const request = await fetch(`${baseUrl}/api/posts/feed/rssFeed`);
  const { posts } = await request.json();

  // We generate the XML sitemap with the posts data
  const sitemap = generateSiteMap(posts);

  res.setHeader('Content-Type', 'text/xml');
  // we send the XML to the browser
  res.write(sitemap);
  res.end();

  return {
    props: {},
  };
}

export default SiteMap;
