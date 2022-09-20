import React from 'react'
import moment from 'moment';


function Content({post}) {


    const getContentFragment = (index, text, obj, type) => {
        let modifiedText = text;
    
        if (obj) {
          if (obj.bold) {
            modifiedText = (<b key={index}>{text}</b>);
          }
    
          if (obj.italic) {
            modifiedText = (<em key={index}>{text}</em>);
          }
    
          if (obj.underline) {
            modifiedText = (<u key={index}>{text}</u>);
          }
        }
    
        switch (type) {
          case 'heading-one':
            return <h3 key={index} className="text-xl font-bold text-center mb-4">{modifiedText.map((item, i) => <React.Fragment key={i}>{item}</React.Fragment>)}</h3>;
          case 'heading-two':
            return <h3 key={index} className="text-lg font-bold mb-4">{modifiedText.map((item, i) => <React.Fragment key={i}>{item}</React.Fragment>)}</h3>;
          case 'heading-three':
            return <h3 key={index} className="text-lg font-semibold mb-4">{modifiedText.map((item, i) => <React.Fragment key={i}>{item}</React.Fragment>)}</h3>;
          case 'heading-four':
            return <h4 key={index} className="text-md font-semibold mb-4">{modifiedText.map((item, i) => <React.Fragment key={i}>{item}</React.Fragment>)}</h4>;
          case 'paragraph':
            return <p key={index} className="mb-8 text-justify">{modifiedText.map((item, i) => <React.Fragment key={i}>{item}</React.Fragment>)}</p>;
          case 'image':
            return (
              <img
                key={index}
                alt={obj.title}
                height={obj.height}
                width={obj.width}
                src={obj.src}
                className="lg:px-10 mb-4 align-middle"
              />
            );
          default:
            return modifiedText;
        }
      };


      console.log("kontent", post)

  return (
    <div className='flex flex-col justify-center'>
        {
            post.content.raw.children.map((typeObj, index)=>{
                const children=typeObj.children.map((item, itemIndex)=> getContentFragment(item, item.text, item ))

                return getContentFragment(index, children, typeObj, typeObj.type)
            })
        }
    </div>
  )
}

export default Content;