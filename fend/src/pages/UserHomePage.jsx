import Navbar from '../components/Navbar/Navbar';
import EventSlider from '../components/EventSlider/EventSlider';
import PopularEvents from '../components/PopularEvents/PopularEvents';

function UserHomePage() {
    return (
        <div className="home">
            <Navbar />
            <main>
                <EventSlider />
                <PopularEvents />
            </main>
        </div>
    );
}

export default UserHomePage;