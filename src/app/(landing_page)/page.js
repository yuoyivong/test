import { HeroSection } from './_components/HeroSection';
import { Footer } from './_components/Footer';
import { Navbar } from './_components/Navbar';
import { AnimateSection } from './_components/AnimateSection';

const Page = () => {

    return (
        <div className="h-full">
            <Navbar />
            <div className="space-y-[80px]">
                <HeroSection />
                <AnimateSection />
            </div>
            <Footer />
        </div>
    )
}

export default Page