import { Link } from "react-router-dom";
import Button from 'react-bootstrap/Button';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger'
import Tooltip from 'react-bootstrap/Tooltip';
import { CheckSquare, Edit, Flag, Trash2 } from 'react-feather';

const IconButtonIconDiv = ({ description, iconType }) => {

    const iconSize = 18

    return (<>
         <div style={{display: 'flex', alignItems: 'center'}}>
            {iconType === 'check-square' &&
                <CheckSquare size={iconSize} alt={description} />}
            {iconType === 'flag' &&
                <Flag size={iconSize} alt={description} />}
            {iconType === 'edit' &&
                <Edit size={iconSize} alt={description}/>}
            {iconType === 'trash-2' &&
                <Trash2 size={iconSize} alt={description}/>}
        </div>
    </>)
}

const IconButton = ({ onClick, disabled, className, buttonVariant, iconType, description, linkTarget }) => {
    return (<>
        <OverlayTrigger
            delay={{ hide: 450, show: 300 }}
            overlay={(props) => (
                <Tooltip {...props}>{ description }</Tooltip>
            )}
        >
            <Button {...{ className, onClick, disabled }} variant={buttonVariant}>
                {linkTarget === undefined &&
                    <IconButtonIconDiv {...{ description, iconType }} />
                }
                {linkTarget &&
                    <Link style={{color: 'white', textDecoration: 'none'}} to={linkTarget}>
                        <IconButtonIconDiv {...{ description, iconType }} />
                    </Link>
                }
            </Button>
        </OverlayTrigger>
    </>)
}

export default IconButton
