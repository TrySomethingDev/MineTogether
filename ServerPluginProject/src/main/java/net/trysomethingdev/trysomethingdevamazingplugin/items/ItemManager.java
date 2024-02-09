//package net.trysomethingdev.trysomethingdevamazingplugin.items;
//
//import net.kyori.adventure.text.Component;
//import org.bukkit.Material;
//import org.bukkit.enchantments.Enchantment;
//import org.bukkit.inventory.ItemFlag;
//import org.bukkit.inventory.ItemStack;
//import org.bukkit.inventory.meta.ItemMeta;
//
//import java.util.ArrayList;
//import java.util.Arrays;
//import java.util.List;
//
//public class ItemManager {
//
//    public static ItemStack wand;
//
//    public static void init() {
//        createWand();
//        createFlamePowder();
//    }
//
//    private static void createWand(){
//        ItemStack item = new ItemStack(Material.STICK, 1);
//        ItemMeta meta = item.getItemMeta();
//        meta.displayName(Component.text("Stick of Truth"));
//        List<String> lore22 = new ArrayList<>();
//        lore22.add("This powerful artifact is a relic of");
//        lore22.add("minecrafts ancient history");
//        meta.setLore(lore22);
//        meta.addEnchant(Enchantment.LUCK,1 ,false);
//        meta.addItemFlags(ItemFlag.HIDE_ENCHANTS);
//        item.setItemMeta(meta);
//        wand = item;
//
//    }
//
//    private static void createFlamePowder(){
//        ItemStack item = new ItemStack(Material.STICK, 1);
//        ItemMeta meta = item.getItemMeta();
//        meta.displayName(Component.text("Stick of TRUTH"));
//       List<Component> lore = new ArrayList<>(); lore.add(Component.text("To be")); lore.add(Component.text("or not")); lore.add(Component.text("to be"));
//       meta.lore(lore);
//
//       meta.addEnchant(Enchantment.LUCK, 1, false);
//       meta.addItemFlags(ItemFlag.HIDE_ENCHANTS);
//       item.setItemMeta(meta);
//       wand = item;
//    }
//
//}
