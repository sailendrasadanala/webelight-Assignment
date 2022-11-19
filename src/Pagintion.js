import React from 'react'

const Pagintion = ({data,pageHandler}) => {
    let pageNumbers = []
    for(let i=1;i<Math.ceil(data.length/10)+1;i++){
            pageNumbers.push(i)
    }
  return (
    <div>
      <center>
        {pageNumbers.map((page)=><div className='pagebutton' style={{display:"inline-block",justifyContent:'space-between',padding:'20px',marginRight:'5px',border:'1px solid black',marginBottom:'30px',cursor:"pointer"}} onClick={()=>pageHandler(page)}>{page}</div>)}
      </center>
    </div>
  )
}

export default Pagintion
