import './SidePanel.css'
import Logo from "../../assets/Logo-White.png"
import JournalsSearch from './JournalsSearch'
import Chart from '../MoodChart/Chart'

function SidePanel(){
    return(
        <div className='SidePanel'>
            <div className='side_panel_nav'>
                <img src={Logo} alt="Logo" width="80px" />

            </div>

            <JournalsSearch/>
            
            <Chart/>

        </div>
    )
}

export default SidePanel