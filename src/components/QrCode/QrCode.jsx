import QRCode from "react-qr-code";
import { ImpactStore } from "../../store/ImpactStore";
import { useContext } from "react";

const QrCode = ({link})=> {
    const { user, setUser } = useContext(ImpactStore);
    return (
        <div className="qr-code">
            <QRCode value={link} />
        </div>
    )
}

export default QrCode;