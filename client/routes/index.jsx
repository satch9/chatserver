import { Card, Typography, Button } from "antd";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@clerk/clerk-react";

const { Paragraph } = Typography;

const content = (
    <div>
        <p>Le jeu de cartes la Bataille est un jeu simple où deux joueurs s&apos;affrontent.</p>
        <p>Chaque joueur reçoit la moitié du paquet de cartes.</p>
        <p>Les cartes sont retournées une par une, et le joueur qui a la carte la plus forte gagne la manche.</p>
        <p>Si les cartes sont de valeurs égales, cela signifie qu&apos;il y a bataille, et les joueurs doivent alors poser trois cartes face cachée et en retourner une quatrième.</p>
        <p>Celui qui a la carte la plus forte gagne la manche.</p>
        <p>Le gagnant est celui qui remporte toutes les cartes de son adversaire.</p>
    </div>
);


export default function IndexPage() {
    const navigate = useNavigate();
    const { isSignedIn } = useAuth();

    console.log("isSignedIn ", isSignedIn)

    return (
        <div className="home-container">
            <Card className="home-card">
                <Paragraph>
                    <p>Bienvenue sur le jeu de cartes :<br /><span className="title">la Bataille</span></p>
                    <Paragraph style={{textAlign: "justify"}}>
                        {content}
                    </Paragraph>
                </Paragraph>
                {
                    isSignedIn && <Button type="primary" onClick={() => navigate("/params")}>Entrer</Button>
                }
            </Card>
        </div>
    )
}