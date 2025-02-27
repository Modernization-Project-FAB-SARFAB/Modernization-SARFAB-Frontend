import { Link } from "react-router-dom";
import Button from "../Button/Button";

const ButtonGroup: React.FC<ButtonGroupProps> = ({ label, onPrimaryClick, cancelLink = '/', isPrimarySubmit = false }) => {
    return (
        <div className="flex justify-end space-x-4">
            <Button label={label} onClick={onPrimaryClick} variant="primary" type={isPrimarySubmit ? "submit" : "button"}/>
            <Link to={cancelLink} className="text-primary">
                <Button label="Cancelar" variant="secondary" type="button" />
            </Link>
        </div>
    );
};

export default ButtonGroup;