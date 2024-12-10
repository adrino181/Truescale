import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import FlatCard from "@/components/Blocks/Cards/flatCard";
import ScrollView from "@/components/Blocks/ScrollView";
import { getHomePageTrending } from "@/components/services/Api";

const ColdRightNav = ({ maxWidth }: { maxWidth?: string }) => {
  const [treeData, setTreeData] = React.useState([]);
  React.useEffect(() => {
    (async () => {
      if (!treeData.length) {
        const { data } = await getHomePageTrending();
        setTreeData(data.posts);
      }
    })();
  }, []);

  return (
    <Box sx={{ maxWidth: maxWidth, overflow: 'hidden' }}>
      <ScrollView>
        <>
          {treeData.map((post) => (
            <Box sx={{ mt: 4, px: 1 }} key={post.category}>
              <Typography variant="subtitle2" color="textPrimary">
                #{post.category}
              </Typography>
              <Box>
                {post.documents.map((item) => (
                  <Box sx={{ width: "100%", my: 1 }} key={item.id}>
                    {<FlatCard post={item} />}
                  </Box>
                ))}
              </Box>
            </Box>
          ))}
        </>
      </ScrollView>
    </Box>
  );
};

export default ColdRightNav;
