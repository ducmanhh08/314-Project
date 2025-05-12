import NavbarUser from '../components/Navbar/NavbarUser';
import EventSlider from '../components/EventSlider/EventSlider';
import PopularEvents from '../components/PopularEvents/PopularEvents';

function UserHomePage() {
    return (
        <div className="home">
            <NavbarUser />
            <main>
                <EventSlider />
                <PopularEvents />
            </main>
        </div>
    );
}

export default UserHomePage;
