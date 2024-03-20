import axios from 'axios';
import { useEffect, useState } from 'react';
// import UploadComponent from './UploadComponent';


function convertImageToBase64(file, callback, callback2) {
    if(file){
        const reader = new FileReader();
        reader.readAsDataURL(file);
    
        reader.onload = () => {
          callback(reader.result);
        };
        reader.onloadend= ()=>{
            callback2();
        }
    }
}

const UploadComponent = ({multiple, onUpload}) => {
  const [files, setFiles] = useState([]);

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const droppedFiles = Array.from(e.dataTransfer.files);
    if(multiple){
        const data = []
        droppedFiles.forEach(file=>{
            convertImageToBase64(file,(base64)=>{
                data.push(base64)
            },()=>{
                if(data.length === droppedFiles.length){
                    onUpload(data)
                }
            })
        })
    }else{
        convertImageToBase64(droppedFiles[0],(base64)=>{
            onUpload(base64)
        },()=>{})
    }
    setFiles(multiple ? [...files, ...droppedFiles] : [...droppedFiles]);
    
  };

  const handleFileUpload = (e) => {
    const uploadedFiles = Array.from(e.target.files);
    if(multiple){
        const data = []
        uploadedFiles.forEach(file=>{
            convertImageToBase64(file,(base64)=>{
                data.push(base64)
            },()=>{
                if(data.length === uploadedFiles.length){
                    onUpload(data)
                }
            })
        })
    }else{
        convertImageToBase64(uploadedFiles[0],(base64)=>{
            onUpload(base64)
        },()=>{})
    }
    setFiles(multiple ? [...files, ...uploadedFiles] : [...uploadedFiles]);
  };

  return (
    <div className="bg-gray-50 p-6 rounded-lg shadow-lg mx-auto mt-10 w-full">
      <h2 className="text-lg font-semibold mb-4">Upload your files</h2>
      <p className="text-gray-600 mb-4">in JPG, PNG, GIF</p>
      <div
        className="border-2 border-dashed border-blue-300 rounded-md p-4 text-center mb-4"
        onDragOver={handleDragOver}
        onDrop={handleDrop}
      >
        <span className="text-blue-500 text-3xl mb-2">&#128247;</span>
        <p className="text-blue-500">Drag and drop or Browse</p>
        <input
          type="file"
          multiple={multiple}
          accept="image/jpeg, image/png, image/gif, image/webp"
          onChange={handleFileUpload}
          className="mt-2"
        />
      </div>
      <ul className="space-y-2">
        {files.map((file, index) => (
          <li
            key={index}
            className="flex items-center bg-white rounded-md p-2 shadow"
          >
            <img
              src={URL.createObjectURL(file)}
              alt={file.name}
              className="h-12 w-12 object-cover rounded-md mr-2"
            />
            <div className="flex-grow">
              <p className="text-sm truncate">{file.name}</p>
              <p className="text-xs text-gray-500">
                {(file.size / 1024 / 1024).toFixed(1)} MB
              </p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};


const UploadDashboard = () => {
  const [heroImage, setHeroImage] = useState(null);
  const [heroHeading1, setHeroHeading1] = useState('');
  const [heroHeading2, setHeroHeading2] = useState('');

  const [paragraphText, setParagraphText] = useState('');
  const [shortTexts, setShortTexts] = useState(['', '', '', '', '']);

  const [projectImages, setProjectImages] = useState([]);

  const handleHeroImageUpload = (file) => {
    console.log(file)
    setHeroImage(file);
  };


  const handleHeroHeading1Change = (e) => {
    setHeroHeading1(e.target.value);
  };

  const handleHeroHeading2Change = (e) => {
    setHeroHeading2(e.target.value);
  };

  const handleParagraphTextChange = (e) => {
    setParagraphText(e.target.value);
  };

  const handleShortTextChange = (e, index) => {
    const newShortTexts = [...shortTexts];
    newShortTexts[index] = e.target.value;
    setShortTexts(newShortTexts);
  };

  const handleProjectImageUpload = (files) => {
    console.log(files)
    setProjectImages(files);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let data = {
      hero: {
        image: heroImage,
        heading1: heroHeading1,
        heading2: heroHeading2,
      },
      paragraph: {
        text: paragraphText,
        shortTexts,
      },
      projects: {
        images: projectImages,
      },
    };

    // data = JSON.stringify(data)

    try {
      const response = await axios.post('http://localhost:3000/api/dashboard', data);
      console.log('Success:', response.data);
    } catch (error) {
      console.error('Error:', error)
    }
    // Save data as JSON or send it to the server
    console.log(data);
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white rounded-lg shadow-md p-8 max-w-2xl w-full">
        <h2 className="text-2xl font-bold mb-4 text-center">Upload Dashboard</h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <h3 className="text-xl font-semibold mb-2">Hero Section</h3>
            <div className="flex flex-col items-center space-x-4 w-full">
              <UploadComponent onUpload={handleHeroImageUpload} />
              <div className="flex flex-col space-y-2 w-full my-4">
                <input
                  type="text"
                  value={heroHeading1}
                  onChange={handleHeroHeading1Change}
                  className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Hero Heading 1"
                />
                <input
                  type="text"
                  value={heroHeading2}
                  onChange={handleHeroHeading2Change}
                  className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Hero Heading 2"
                />
              </div>
            </div>
          </div>
          <div>
            <h3 className="text-xl font-semibold mb-2">Paragraph Section</h3>
            <textarea
              value={paragraphText}
              onChange={handleParagraphTextChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4"
              placeholder="Paragraph text..."
            />
            <div className=" w-full">
              {shortTexts.map((text, index) => (
                <input
                  key={index}
                  type="text"
                  value={text}
                  onChange={(e) => handleShortTextChange(e, index)}
                  className="px-4 py-2 border border-gray-300 w-3/4 my-3 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder={`Short text ${index + 1}`}
                />
              ))}
            </div>
          </div>
          <div>
            <h3 className="text-xl font-semibold mb-2">Project Images</h3>
            <UploadComponent onUpload={handleProjectImageUpload} multiple />
          </div>
          <button
            type="submit"
            className="w-full px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Save
          </button>
        </form>
      </div>
    </div>
  );
};

export default UploadDashboard;