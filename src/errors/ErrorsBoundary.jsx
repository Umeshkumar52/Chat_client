import React from 'react'

 class ErrorsBoundary extends React.Component{
    constructor(props){
     super(props)
     this.state={hasError:false}
    }
    static getDerivedStateFromError(error){
        return {hasError:true}
    }
    componentDidCatch(error,errorInf){
        console.log(error,errorInf);
        
    }
    render(){
        if(this.state.hasError){
            return <h1>Something Went Wrong!</h1>
        }
        return this.state.children
    }
 }
 export default ErrorsBoundary