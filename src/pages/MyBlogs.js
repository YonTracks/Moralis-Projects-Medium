import { useEffect, useState } from "react";
import "./MyBlogs.css";
import axios from "axios";
import BlogCard from "../components/BlogCard";
import { Button } from "web3uikit";
import { useNavigate } from "react-router-dom";
import { useMoralisWeb3Api, useMoralis } from "react-moralis";

const MyBlogs = () => {
  //!!! HARD CODED EXAMPLE OF JSON
 /*const [blogs, setBlogs] = useState([
{externalUrl:"", owerner_of: "0x0ag6hjhl00"}
 ])*/
  const Web3Api = useMoralisWeb3Api();
  const { isInitialized, isAuthenticated, account } = useMoralis();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [blogs, setBlogs] = useState();
  const [blogsContent, setBlogsContent] = useState();


  const fetchAllNfts = async () => {

    const options = {
      chain: "mumbai",
      address: account,
      token_address: "0xf2fc7fD9e779294E3E903E5f3f0c632dc34d022c",  //contract Hard Coded
    };

    const polygonNFTs = await Web3Api.account.getNFTsForContract(options);
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
          const date = res.data.date;
          contentBlog.push({ date, title, text, owner_of, externalUrl });
        }
      });
    }
    
    setBlogsContent(contentBlog);
    setLoading(false);
  };

  useEffect(() => {
    if (blogs && !blogsContent) {
      setLoading(true);
      fetchBlogsContent();
    }
  }, [blogs, blogsContent]);

  useEffect(() => {
    if (isInitialized && isAuthenticated) {
      fetchAllNfts();
    } 
  }, [isAuthenticated, isInitialized, account]);

  const clickHandler = () => {
    navigate("/newStory");   //Using navigate function from "useNavigate" navigate to /new story page
  };

  if (loading) return (
    <main style={{ padding: "1rem 0" }}>
      <div className="loading" >
        <h1 style={{color:"blue"}}> Loading ...</h1>
        <h2 style={{color:"blue"}}>Please be patient while your Post is being created</h2>
        
        </div>
    </main>
  );

  return (
    <>
      <div>
      <div className="myBlogsHeader">Your Blogs</div>
        {blogsContent && blogsContent?.length > 0 ? (
            blogsContent.map((blog, i) => {
              const { date, title, text, owner_of, externalUrl } = blog;
              return (
                <BlogCard
                  key={i}
                  date={date}
                  title={title}
                  text={text}
                  ownerOf={owner_of}
                  externalUrl={externalUrl}
                />
              );
            })
        ) : (
          <div
          style={{
            fontSize: "30px",
            width: "100%",
            marginLeft: "40%",
          }}
        >
          <p>No Blogs Yet</p>
          <Button style={{marginLeft: "4%"}} text="Create one" onClick={clickHandler} />
        </div>
        )}
      </div>
    </>
  );
};

export default MyBlogs;
