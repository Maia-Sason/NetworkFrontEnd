import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSyncAlt } from '@fortawesome/free-solid-svg-icons'

function Load() {
    return (
        <div className="load">
            <p> loading </p>
            <FontAwesomeIcon className="load_spin" icon={faSyncAlt}/>
            
        </div>
    )
}

export default Load
