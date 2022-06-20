import { useState, useEffect } from "react";
import "./HomeAuth.css";
import axios from "axios";
import BlogCard from "../components/BlogCard";
import { useMoralisWeb3Api } from "react-moralis";



const HomeAuth = () => {
  const [loading, setLoading] = useState(false);
  const [blogs, setBlogs] = useState();
  const [blogsContent, setBlogsContent] = useState();
  const Web3Api = useMoralisWeb3Api();
  const [searchText] = useState("");
  const fetchAllNfts = async () => {
    setLoading(true);
    const options = {
      chain: "mumbai",
      address: "0xf2fc7fD9e779294E3E903E5f3f0c632dc34d022c", //contract address
    };
//Here is where the Users smartcontract BLOG's are collected 
    const polygonNFTs = await Web3Api.token.getNFTOwners(options);
    //Here is where the "Result key" of json.ipfs is maped
    const tokenUri = polygonNFTs?.result?.map((data) => {
      const { metadata, owner_of } = data;

      if (metadata) {
        const metadataObj = JSON.parse(metadata);
        const { externalUrl } = metadataObj;
        return { externalUrl, owner_of };
      } else {
        return undefined;
      }
    });
    setBlogs(tokenUri);
    
  };
  

  const fetchBlogsContent = async () => {
    
    const limit5 = blogs?.slice(0, 5);
    let contentBlog = [];

    if (limit5) {
      limit5.map(async (blog) => {
        if (blog) {
          const { externalUrl, owner_of } = blog;
          const res = await axios.get(externalUrl);
          const text = res.data.text.toString();
          const title = res.data.title;
          const image = res.data.image;
          const date = res.data.date;
          contentBlog.push({ date, image, title, text, owner_of, externalUrl });
        }
      });
    }
    setLoading(false);
    setBlogsContent(contentBlog);
    setLoading(false);
    console.log(contentBlog);
  };
  
  useEffect(() => {
    if (blogs && !blogsContent) {
      fetchBlogsContent();
      
    }
  }, [blogs, blogsContent]);

  useEffect(() => {
    if (!blogs) {
      setLoading(true);
      fetchAllNfts();
    }
  }, [blogs]);

  if (loading) return (
  <main style={{ padding: "1rem 0" }}>
    <div className="loading" >
      <h1 style={{color:"blue"}}> Loading ...</h1>
      <h2 style={{color:"red"}}>This Dapp is Running on the "blockchain"</h2>
      <h2 style={{color:"blue"}}>Please be patient while We fetch the Blog's and Dapp data!</h2>
      </div>
  </main>
);

  return (
    <div className="homeAuth_container">
      <div className="homeAuth_header">Recommended Blogs</div>
      <div className="homeAuth_blogs">
        {blogsContent &&
          blogsContent.map((blog, i) => {
            const { date, title, text, image, owner_of, externalUrl } = blog;
            return (
              <BlogCard
                blogs={blogsContent.filter((blog) =>
                  blog.title.toLowerCase().includes(searchText)
                  )}
                key={i}
                date={date}
                title={title}
                text={text}
                image={image}
                ownerOf={owner_of}
                externalUrl={externalUrl}
              />
            );
          })}
      </div>
    </div>
  );
};

export default HomeAuth;
