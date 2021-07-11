import AllMovie from "./AllMovie"
import CategoryMovie from "./CategoryMovie"
import MoviePlan from "./MoviePlan"
import NewMovie from "./NewMovie"
import MovieNews from "./MovieNews"

const Home = () => {
    return (
        <>
            <NewMovie/>
            <AllMovie/>
            <CategoryMovie/>
            <MoviePlan/>
            <MovieNews/>
        </>
    );
}

export default Home;