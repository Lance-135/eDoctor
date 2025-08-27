

const LoadingCircle = ({width = 'w-12', height = 'h-12', color= 'border-t-blue-500'})=>{
    const class_name = `${width} ${height} border-4 border-gray-300 ${color} rounded-full animate-spin `
     return (
    <div className = 'container justify-center items-center h-screen flex content-stretch'>
        <h3 className= 'font-bold text-blue-500 rounded-full text-3xl'>Loading...</h3>
        <div className={class_name}
        style={{ width: `${width}px`, height: `${height}px` }}>
        </div>
    </div>
  );
}

export default LoadingCircle