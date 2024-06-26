import { Link, Outlet, useNavigate } from 'react-router-dom'
import { ClerkProvider, SignedIn, SignedOut, UserButton, SignInButton } from '@clerk/clerk-react'

import { Layout, Col, Row } from 'antd'
import Chat from '../components/chat/Chat'



const { Header, Content, Footer } = Layout

const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY

if (!PUBLISHABLE_KEY) {
    throw new Error("Missing Publishable Key")
}

export default function RootLayout() {
    const navigate = useNavigate();

    return (
        <ClerkProvider navigate={navigate} publishableKey={PUBLISHABLE_KEY}>
            <Layout >
                <Header className="header">
                    <Link to="/"><div style={{ color: "white" }}>La Bataille</div></Link>
                    <SignedIn >
                        <UserButton afterSignOutUrl='/' />
                    </SignedIn>
                    <SignedOut >
                        <SignInButton mode='modal' className="sign-in-button">
                            Se connecter
                        </SignInButton>
                    </SignedOut>
                </Header>

                <Content style={{ padding: '20px 50px', width: '800px', }}>
                    <Row style={{ gap: '25px' }}>
                        <Col xs={{ flex: '100%' }} sm={{ flex: '50%', }} md={{ flex: '45%', }} lg={{ flex: '45%', }} xl={{ flex: '45%', }} >

                            <main>
                                <Outlet />
                            </main>

                        </Col>

                        <Col xs={{ flex: '100%' }} sm={{ flex: '50%', }} md={{ flex: '45%', }} lg={{ flex: '45%', }} xl={{ flex: '45%', }}>

                            <Chat />

                        </Col>
                    </Row>
                </Content>

                <Footer style={{ textAlign: 'center' }}>Bataille - React AntD Socket.IO</Footer>

            </Layout>
        </ClerkProvider>
    )
}