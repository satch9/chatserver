import { Link, Outlet, useNavigate } from 'react-router-dom'
import { ClerkProvider, SignedIn, SignedOut, UserButton, SignInButton } from '@clerk/clerk-react'

import { Layout } from 'antd'
import Chat from '../components/chat/Chat'

const { Header, Content, Footer, Sider } = Layout

const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY

if (!PUBLISHABLE_KEY) {
    throw new Error("Missing Publishable Key")
}

export default function RootLayout() {
    const navigate = useNavigate();

    return (
        <ClerkProvider navigate={navigate} publishableKey={PUBLISHABLE_KEY}>
            <Layout>
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

                <Content style={{ padding: '20px 50px', width: '800px' }}>
                    <Layout style={{justifyContent: 'space-between', gap:'10px'}}>
                        <main>
                            <Outlet />
                        </main>
                        <Sider width="45%" >
                            <Chat />
                        </Sider>
                    </Layout>
                </Content>

                <Footer style={{ textAlign: 'center' }}>Bataille - React AntD Socket.IO</Footer>

            </Layout>
        </ClerkProvider>
    )
}