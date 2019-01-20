var friendsData = require('../data/friends');

module.exports = function (app) {
    app.get('/api/friends', function (req, res) {
        res.json(friendsData);
    });

    app.post('/api/friends', function (req, res) {
        var questionNumber = 10;
        var currentFriend = req.body;
        var currentScores = currentFriend.scores;
        var highestCompatibility = 0;
        var highestCompatibilityIndex = 0;
        for (var i = 0; i < friendsData.length; i++) {
            var compatibility = 0;
            var comparisonScores = friendsData[i].scores;
            for (var j = 0; j < questionNumber; j++) {
                if (comparisonScores[j] == currentScores[j]) {
                    compatibility++;
                }
            }

            if (compatibility > highestCompatibility) {
                highestCompatibility = compatibility;
                highestCompatibilityIndex = i;
            }

        }

        friendsData.push(currentFriend);
        

        if (highestCompatibility > 0) {

            var compatibleFriend = friendsData[highestCompatibilityIndex];

            res.json(compatibleFriend);
        }
        else {
            alert('No match found.');
        }

    });
}