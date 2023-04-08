import Header from './components/Header';
import Footer from './components/Footer';

function DefaultLayout({ children }) {
    return (
        <div className="flex flex-col min-h-screen">
            <Header />
            <div className="flex-1 bg-[#343a40]">{children}</div>
            <Footer />
        </div>
    );
}

export default DefaultLayout;
