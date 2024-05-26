package main

import (
	"errors"
	"net/http"
	// "strings"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
)

type videoGame struct {
	ID        string `json:"id"`
	Title     string `json:"title"`
	Developer string `json:"developer"`
	Platform  string `json:"platform"`
	Year      int    `json:"year"`
}

var videoGames = []videoGame{
	{ID: "1", Title: "Sonic the Hedgehog", Developer: "Sega", Platform: "Genesis", Year: 1991},
	{ID: "2", Title: "The Legend of Zelda: Link's Awakening", Developer: "Nintendo", Platform: "SNES", Year: 1993},
	{ID: "3", Title: "GoldenEye 007", Developer: "Rare", Platform: "N64", Year: 1997},
	{ID: "4", Title: "Metroid Prime", Developer: "Retro Studios", Platform: "Gamecube", Year: 2002},
	{ID: "5", Title: "Shadow of the Colossus", Developer: "Japan Studio & Team Ico", Platform: "PS2", Year: 2005},
	{ID: "6", Title: "Super Mario Bros. 3", Developer: "Nintendo", Platform: "NES", Year: 1990},
	{ID: "7", Title: "Streets of Rage 2", Developer: "Sega", Platform: "Genesis", Year: 1992},
	{ID: "8", Title: "World Series Baseball", Developer: "BlueSky Software", Platform: "Genesis", Year: 1994},
	{ID: "9", Title: "Killer Instinct", Developer: "Rare", Platform: "SNES", Year: 1995},
	{ID: "10", Title: "Mario Kart 64", Developer: "Nintendo", Platform: "N64", Year: 1996},
}

func getVideoGames(c *gin.Context) {
	c.IndentedJSON(http.StatusOK, videoGames)
}

func videoGameById(c *gin.Context) {
	id := c.Param("id")
	videoGame, err := getVideoGameById(id)
	if err != nil {
		c.IndentedJSON(http.StatusNotFound, gin.H{"message": "Video game not found"})
		return
	}
	c.IndentedJSON(http.StatusOK, videoGame)
}

func getVideoGameById(id string) (*videoGame, error) {
	for i, vg := range videoGames {
		if vg.ID == id {
			return &videoGames[i], nil
		}
	}
	return nil, errors.New("video game not found")
}

func saveVideoGames(c *gin.Context) {
	var updatedVideoGames []videoGame
	if err := c.BindJSON(&updatedVideoGames); err != nil {
		c.IndentedJSON(http.StatusBadRequest, gin.H{"message": "Invalid input"})
		return
	}

	videoGames = updatedVideoGames
	c.IndentedJSON(http.StatusOK, gin.H{"message": "Video games order saved successfully"})
}

func main() {
	router := gin.Default()
	config := cors.DefaultConfig()
	config.AllowOrigins = []string{
		"http://localhost:3000",
		"https://videogame-ranker.vercel.app",
	}
	// Allow all methods, headers, and credentials for your requests.
	config.AllowMethods = []string{"GET", "POST", "PUT", "DELETE", "OPTIONS"}
	config.AllowHeaders = []string{"Origin", "Content-Type", "Accept", "Authorization"}
	config.AllowCredentials = true
	router.Use(cors.New(config))

	router.GET("/videoGames", getVideoGames)
	router.GET("/videoGames/:id", videoGameById)
	router.POST("/saveVideoGames", saveVideoGames)

	router.Run("localhost:8082")
}
