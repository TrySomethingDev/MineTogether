//package net.trysomethingdev.trysomethingdevamazingplugin.handlers;
//
//import net.trysomethingdev.trysomethingdevamazingplugin.TrySomethingDevAmazingPlugin;
//import org.bukkit.Bukkit;
//import org.bukkit.event.EventHandler;
//import org.bukkit.event.Listener;
//import org.bukkit.event.entity.EntityEvent;
//
//public class EntityHandler implements Listener {
//
//    public EntityHandler(TrySomethingDevAmazingPlugin plugin){
//        Bukkit.getPluginManager().registerEvents(this, plugin);
//    }
//
//    @EventHandler
//    public void onEntityEvent(EntityEvent event)
//    {
//        var entity = event.getEntity();
//        var name = entity.getName();
//        Bukkit.getLogger().info(name);
////        Block block = event.getBlock();
////        if(block.getType() != Material.TORCH){
////            return;
////        }
////
////        Bukkit.getLogger().info("A torch was placed");
////        event.getBlock().setType(Material.DIAMOND_BLOCK);
//    }
//
//
//}
