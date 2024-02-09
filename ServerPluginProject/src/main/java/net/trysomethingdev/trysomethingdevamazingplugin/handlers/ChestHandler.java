package net.trysomethingdev.trysomethingdevamazingplugin.handlers;

import net.trysomethingdev.trysomethingdevamazingplugin.TrySomethingDevAmazingPlugin;
import net.trysomethingdev.trysomethingdevamazingplugin.minetogethermode.MineTogetherModeManager;
import org.bukkit.Bukkit;
import org.bukkit.Material;
import org.bukkit.block.Block;

import org.bukkit.block.Chest;
import org.bukkit.event.EventHandler;
import org.bukkit.event.Listener;
import org.bukkit.event.block.BlockBreakEvent;
import org.bukkit.event.block.BlockPlaceEvent;

public class ChestHandler implements Listener{

    private MineTogetherModeManager _mineTogetherModeManager;
        public ChestHandler(TrySomethingDevAmazingPlugin plugin, MineTogetherModeManager mineTogetherModeManager){
            Bukkit.getPluginManager().registerEvents(this, plugin);
            _mineTogetherModeManager = mineTogetherModeManager;
        }

        @EventHandler
        public void onChestplace(BlockPlaceEvent event)
        {
            Block block = event.getBlock();
            if(block.getType() != Material.CHEST){
                Bukkit.getLogger().info("A Chest was not placed");

                return;
            }

          //  Bukkit.getLogger().info(block.getBlockData().getAsString());
          // Bukkit.getLogger().info(block.getMetadata("lore").toString());

            Chest chest = (Chest) block.getState();
            if (chest.customName() != null ) {
                String chestName = chest.customName().toString();
                Bukkit.getLogger().info(chestName);
                if (chestName.contains("Mine Together Mode Chest")) {
                    Bukkit.getLogger().info("A Mine Together Mode Chest was placed");
                    //When this happens we trigger MineTogetherMode
                    _mineTogetherModeManager.start(chest);
                    return;
                }
            }
        //    Bukkit.getLogger().info("A different type of chest was placed");

//            if(block.getType() != Material.CHEST){
//                Bukkit.getLogger().info("A Chest was placed");
//                return;
//            }
//            Bukkit.getLogger().info("A Mine Together Mode Chest was placed");

        }


}
