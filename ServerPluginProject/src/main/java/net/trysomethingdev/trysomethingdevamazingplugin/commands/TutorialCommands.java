package net.trysomethingdev.trysomethingdevamazingplugin.commands;

import net.trysomethingdev.trysomethingdevamazingplugin.minetogethermode.items.ItemManager;
import org.bukkit.command.Command;
import org.bukkit.command.CommandExecutor;
import org.bukkit.command.CommandSender;
import org.bukkit.entity.Player;
import net.trysomethingdev.trysomethingdevamazingplugin.minetogethermode.items.ItemManager;

public class TutorialCommands implements CommandExecutor {
    @Override
    public boolean onCommand( CommandSender commandSender, Command command, String label, String[] args) {
        if(!(commandSender instanceof Player)) {
            commandSender.sendMessage("Only PLayers can use that command");
            return true;
        }

        Player player = (Player) commandSender;
        if (command.getName().equalsIgnoreCase("givechest")){
            player.getInventory().addItem(ItemManager.chest);
        }

        return true;
    }
}
