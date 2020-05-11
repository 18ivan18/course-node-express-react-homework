//rfreduxp
import React from 'react'
import { connect } from 'react-redux'



export const Home = () => {
    return (
        <center>
            <div className="z-depth-1 grey lighten-4 row" style={{width:"100%", opacity:"0.95", display: 'inline-block', padding: '32px 48px 0px 48px', border: '1px solid #EEE'}}>
                <h1 className="center-align">Just a home page, nothing to see here</h1>
            </div>
        </center>
        )
}

const mapStateToProps = (state) => ({
    
})

const mapDispatchToProps = {
    
}

export default connect(mapStateToProps, mapDispatchToProps)(Home)
