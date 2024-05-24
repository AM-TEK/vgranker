package main
import (
	"errors"
	"net/http"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
)

//create struct to represent a video game
type videoGame struct{
	ID				string	`json:"id"`
	Title			string	`json:"title"`
	Developer	string	`json:"developer"`
	Year			int			`json:"year"`
}

//Initialize a slice of 'videoGames' containing instances of video game struct
var videoGames = []videoGame{
	{ID: "1", Title: "Sonic the Hedgehog", Developer: "Sega", Year: 1991},
	{ID: "2", Title: "The Legend of Zelda: Link's Awakening", Developer: "Nintendo", Year: 1993},
	{ID: "3", Title: "GoldenEye 007", Developer: "Rare", Year: 1997},
	{ID: "4", Title: "Metroid Prime", Developer: "Retro Studios", Year: 2002},
	{ID: "5", Title: "Shadow of the Colossus", Developer: "Japan Studio and Team Ico", Year: 2005},
	// {ID: "6", Title: "Super Mario Bros. 3", Developer: "Nintendo", Year: 1990},
	// {ID: "7", Title: "Streets of Rage 2", Developer: "Sega", Year: 1992},
	// {ID: "8", Title: "World Series Baseball", Developer: "BlueSky Software", Year: 1994},
	// {ID: "9", Title: "Killer Instinct", Developer: "Rare", Year: 1995},
	// {ID: "10", Title: "Mario Kart 64", Developer: "Nintendo", Year: 1996},
	// {ID: "11", Title: "Half-Life", Developer: "Valve Corporation", Year: 1998},
	// {ID: "12", Title: "Super Smash Bros", Developer: "HAL Laboratory", Year: 1999},
	// {ID: "13", Title: "Power Stone 2", Developer: "Capcom", Year: 2000},
	// {ID: "14", Title: "Halo", Developer: "Bungie Inc.", Year: 2001},
	// {ID: "15", Title: "Star Wars: KOTOR", Developer: "BioWare", Year: 2003},
	// {ID: "16", Title: "Metroid: Zero Mission", Developer: "Nintendo R&D1", Year: 2004},
	// {ID: "17", Title: "Dead Rising", Developer: "Capcom", Year: 2006},
	// {ID: "18", Title: "Call of Duty 4: Modern Warfare", Developer: "Infinity Ward", Year: 2007},
	// {ID: "19", Title: "Fallout 3", Developer: "Bethesda Game Studios", Year: 2008},
	// {ID: "20", Title: "Uncharted 2: Among Thieves", Developer: "Naughty Dog", Year: 2009},
}
//Handles the `GET /videoGames` endpoint by returning the list of all video games
func getVideoGames(c *gin.Context) {
	c.IndentedJSON(http.StatusOK, videoGames)
}
//Handles the `GET /videoGames/:id` endpoint by returning a specific video game by its ID
func videoGameById(c *gin.Context) {
	id := c.Param("id")
	videoGame, err := getVideoGameById(id)
	if err != nil {
		c.IndentedJSON(http.StatusNotFound, gin.H{"message": "Video game not found"})
		return
	}
	c.IndentedJSON(http.StatusOK, videoGame)
}
//Helper function to find a video game by its ID
func getVideoGameById(id string) (*videoGame, error) {
	for i, vg := range videoGames {
		if vg.ID == id {
			return &videoGames[i], nil
		}
	}
	return nil, errors.New("video game not found")
}

// create routers with the help of gin package
func main() {
	router := gin.Default()
	// CORS middleware
	config := cors.DefaultConfig()
	config.AllowOrigins = []string{"http://localhost:3000"}
	router.Use(cors.New(config))

	router.GET("/videoGames", getVideoGames)
	router.GET("/videoGames/:id", videoGameById)
	
	router.Run("localhost:8082")
}