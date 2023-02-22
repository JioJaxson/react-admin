import React,{Component,Fragment} from "react";
// 样式
import "./aaa.scss";
import { Button } from 'antd';
class Home extends Component { 
    constructor() {
        super();
        this.state = {};

    }
    render() {
        return (
            <Fragment>
                <div>Home
                <Button type="primary">上传</Button>    
                </div>
            </Fragment>
           
        )
    }
}

export default Home;