package net.trysomethingdev.trysomethingdevamazingplugin.fishtogethermode;


import net.trysomethingdev.trysomethingdevamazingplugin.TrySomethingDevAmazingPlugin;
import org.bukkit.Bukkit;
import org.bukkit.block.Chest;

import java.io.IOException;
import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;

import static java.lang.Integer.parseInt;

public class FishTogetherModeManager {
    TrySomethingDevAmazingPlugin _plugin;
    String _yourMCPlayerName;
    private String _baseUrl;

    public FishTogetherModeManager(TrySomethingDevAmazingPlugin plugin, String yourMCPlayerName,String ApiBaseUrl) {
        _plugin = plugin;
        _yourMCPlayerName = yourMCPlayerName;
        _baseUrl = ApiBaseUrl;
    }



    public void OnNewFishingStationPlaced(Chest chest)  {

        Bukkit.getLogger().info("A Fishing Station has been placed");
        Bukkit.dispatchCommand(Bukkit.getPlayer("TrySomethingDev"),"say hello from fishTogetherManager!");

        double x = 0;
        double y = 64;
        double z = 5;
        String facing = "north";

        try {
            HttpRequest request = HttpRequest.newBuilder()
                    .uri(URI.create(_baseUrl + "/fishing/createSpawnPoint"))
                    .header("Content-Type", "application/json")
                    .method("POST",
                            HttpRequest.BodyPublishers.ofString("{\n  \"location\": {\n    \"x\": "+ x + ",\n    \"y\": "+ y + ",\n    \"z\": "+ z+ ",\n facing: "+ facing +"  \n  }\n}"))
                    .build();
            HttpResponse<String> response = HttpClient.newHttpClient().send(request, HttpResponse.BodyHandlers.ofString());
            System.out.println(response.body());

            Bukkit.getLogger().info(response.body());

        } catch (IOException e) {
            // Handle the exception here (e.g., log an error message or take other appropriate actions)
            System.err.println("An error occurred while making the HTTP request: " + e.getMessage());
        } catch (InterruptedException e) {
            //throw new RuntimeException(e);
            System.err.println("An error occurred while making the HTTP request: " + e.getMessage());
        }

    }

    public void OnFishingStationRemoved(Chest chest) {

        Bukkit.getLogger().info("A Fishing Station has been removed...calling API");
      //  Bukkit.dispatchCommand(Bukkit.getPlayer("TrySomethingDev"),"say hello from fishTogetherManager!");

        var idToDelete = GetFishingStationIdByLocation(chest);

        try {

            HttpRequest request = HttpRequest.newBuilder()
                    .uri(URI.create(_baseUrl + "/fishing/deleteSpawnPoint"))
                    .header("Content-Type", "application/json")
                    .method("POST", HttpRequest.BodyPublishers.ofString("{\n  \"id\": \""+ idToDelete + "\"\n}"))
                    .build();
            HttpResponse<String> response = HttpClient.newHttpClient().send(request, HttpResponse.BodyHandlers.ofString());
            System.out.println(response.body());
            Bukkit.getLogger().info(response.body());

        } catch (IOException e) {
            // Handle the exception here (e.g., log an error message or take other appropriate actions)
            System.err.println("An error occurred while making the HTTP request: " + e.getMessage());
        } catch (InterruptedException e) {
            //throw new RuntimeException(e);
            System.err.println("An error occurred while making the HTTP request: " + e.getMessage());
        }
    }

    private String GetFishingStationIdByLocation(Chest chest) {

        var fishingLocationsJSON = GetAllFishingStationLocations(chest);

    return null;
    }

    private String GetAllFishingStationLocations(Chest chest) {

        try
        {
            HttpRequest request = HttpRequest.newBuilder()
                    .uri(URI.create(_baseUrl + "/fishing/getSpawnPoints"))
                    .method("GET", HttpRequest.BodyPublishers.noBody())
                    .build();
            HttpResponse<String> response = HttpClient.newHttpClient().send(request, HttpResponse.BodyHandlers.ofString());
            System.out.println(response.body());
            return response.body().toString();
        }
        catch (IOException e) {
            // Handle the exception here (e.g., log an error message or take other appropriate actions)
            System.err.println("An error occurred while making the HTTP request: " + e.getMessage());
        }
        catch (InterruptedException e) {
            //throw new RuntimeException(e);
            System.err.println("An error occurred while making the HTTP request: " + e.getMessage());
        }

        return "";
    }
}

