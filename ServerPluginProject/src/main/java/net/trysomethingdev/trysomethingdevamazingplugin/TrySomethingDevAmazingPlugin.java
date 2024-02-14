package net.trysomethingdev.trysomethingdevamazingplugin;

import net.trysomethingdev.trysomethingdevamazingplugin.commands.TutorialCommands;
import net.trysomethingdev.trysomethingdevamazingplugin.handlers.ChestHandler;
import net.trysomethingdev.trysomethingdevamazingplugin.handlers.FishingHandler;
import net.trysomethingdev.trysomethingdevamazingplugin.handlers.TorchHandler;
import net.trysomethingdev.trysomethingdevamazingplugin.minetogethermode.MineTogetherModeManager;
import net.trysomethingdev.trysomethingdevamazingplugin.minetogethermode.items.ItemManager;
import net.trysomethingdev.trysomethingdevamazingplugin.util.DelayedTask;
import org.bukkit.Bukkit;
import org.bukkit.Material;
import org.bukkit.NamespacedKey;
import org.bukkit.enchantments.Enchantment;
import org.bukkit.inventory.ItemStack;
import org.bukkit.inventory.ShapedRecipe;
import org.bukkit.inventory.meta.ItemMeta;
import org.bukkit.plugin.java.JavaPlugin;
import org.jetbrains.annotations.NotNull;

public final class TrySomethingDevAmazingPlugin extends JavaPlugin {

    @Override
    public void onEnable() {
        // Plugin startup logic



        //PUT YOUR MINECRAFT USERNAME HERE
        String yourMineCraftPlayerName = "TrySomethingDev";
        saveDefaultConfig();
        var mineTogetherModeManager = new MineTogetherModeManager(this,yourMineCraftPlayerName);
        new ChestHandler(this, mineTogetherModeManager);
        //new EntityHandler(this);
        new DelayedTask(this);
        ItemManager.init(this);
        getCommand("givechest").setExecutor(new TutorialCommands());

        //Fish Together Mode Code Below this point
        new FishingHandler(this, mineTogetherModeManager);


    }

    @Override
    public void onDisable() {
        // Plugin shutdown logic
    }
}
