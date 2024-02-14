package net.trysomethingdev.trysomethingdevamazingplugin.handlers;

import net.trysomethingdev.trysomethingdevamazingplugin.TrySomethingDevAmazingPlugin;
import net.trysomethingdev.trysomethingdevamazingplugin.minetogethermode.MineTogetherModeManager;
import org.bukkit.Bukkit;
import org.bukkit.Material;
import org.bukkit.block.Block;
import org.bukkit.block.Chest;
import org.bukkit.entity.Cow;
import org.bukkit.entity.FishHook;
import org.bukkit.event.EventHandler;
import org.bukkit.event.Listener;
import org.bukkit.event.block.BlockPlaceEvent;
import org.bukkit.event.player.PlayerFishEvent;

public class FishingHandler implements Listener{

    private MineTogetherModeManager _mineTogetherModeManager;
        public FishingHandler(TrySomethingDevAmazingPlugin plugin, MineTogetherModeManager mineTogetherModeManager){
            Bukkit.getPluginManager().registerEvents(this, plugin);
            _mineTogetherModeManager = mineTogetherModeManager;
        }

    @EventHandler
    public void onPlayerFish(PlayerFishEvent event) {
        if (event.getState() == PlayerFishEvent.State.FISHING) {
            FishHook hook = event.getHook();
            Cow cow = event.getPlayer().getWorld().spawn(hook.getLocation(), Cow.class);
            hook.addPassenger(cow);
            hook.setVelocity(hook.getVelocity().multiply(5));
        }
    }





}
