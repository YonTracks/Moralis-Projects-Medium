import { useState } from "react";
import "./NewStory.css"
import {
  useMoralisFile,
  useMoralis,
  useWeb3ExecuteFunction,
} from "react-moralis";

const NewStory = () => {
  const [loading, setLoading] = useState(false);
  const [date, setDate] = useState(`${Date().slice(0,21)}`)
  const [title, setTitle] = useState("");
  const [text, setText] = useState("");
  const { saveFile } = useMoralisFile();
  const { Moralis, account } = useMoralis();
  const contractProcessor = useWeb3ExecuteFunction();
  const mint = async (account, uri) => {
  
    let options ={
      contractAddress: "0xf2fc7fD9e779294E3E903E5f3f0c632dc34d022c", //Contract Hard Coded.......................
      functionName: "safeMint",
      abi: [
        {
          inputs: [
            {
              internalType: "address",
              name: "to",
              type: "address",
            },
            {
              internalType: "string",
              name: "uri",
              type: "string",
            },
          ],
          name: "safeMint",
          outputs: [],
          stateMutability: "payable",
          type: "function",
        },
      ],
      params: {
        to: account,
        uri: uri,  
      },
      msgValue: Moralis.Units.ETH(1),
    };

    await contractProcessor.fetch({
      params: options,
      onSuccess: () => {
        setDate("");
        setText("");
        setTitle("");
        setLoading(true);
      },
      onError: (error) => {
        alert(error.message);
      },
    });

  };

  if (loading) return (
    <main style={{ padding: "1rem 0" }}>
      <div className="loading" >
        <h1 style={{color:"blue"}}>Success Minting...</h1>
        <h2 style={{color:"red"}}>Please be patient while your Blog is being Minted</h2>
        <h2 style={{color:"blue"}}>After the transaction Complete's in wallet? reload app!</h2>
        </div>
    </main>
  );

  const uploadFile = async (event) => {
    //Prevent Default Action!!! to let async upload function cary out!
    event.preventDefault();
    setDate(`${Date().slice(0,21)}`);
    const textArray = text.split();
    const metadata = {
      date,
      title,
      text: textArray,
    };
//Here is the function to Upload .json(metadata) file to ipfs using Moralis 
    try {
      const result = await saveFile(
        "myblog.json",
        { base64: btoa(JSON.stringify(metadata)) },
        {
          type: "base64",
          saveIPFS: true,
          
        }
      );
      //Here the .json(metadata) has been saved and "metadata ipfs file link" recieved!  
      const nftResult = await uploadNftMetada(result.ipfs()); 

      await mint(account, nftResult.ipfs());
    } catch (error) {
      alert(error.message);
    }

  }

// Then...  Here is where the "metadata ipfs file link"(externalUrl, description, image) gets uploaded to ipfs!
// !!! IMPORTANT ! image is HARD CODED  todo.................
  const uploadNftMetada = async (url) => {
    const metadataNft = {
      date: date,
      description: title,
      externalUrl: url,
    };
    const resultNft = await saveFile(
      "metadata.json",
      { base64: btoa(JSON.stringify(metadataNft)) },
      {
        type: "base64",
        saveIPFS: true,
      }
    );
    return resultNft;
  };

  return (
    <>
        <div>
          <form onSubmit={uploadFile} className="writeForm">
            <div 
                className="writeFormGroup">
            <input
                className="writeInput"
                placeholder="Title"
                type="text"
                autoFocus={true}
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>
            <div className="writeFormGroup">
            <textarea
                className="writeInput writeText"
                placeholder="Tell your story..."
                autoFocus={true}
                value={text}
                onChange={(e) => setText(e.target.value)}
              />
            </div>
            <button className="writeSubmit" type="submit" >
              Publish
            </button>
          </form>
        </div>
    </>
  );
};

export default NewStory;
