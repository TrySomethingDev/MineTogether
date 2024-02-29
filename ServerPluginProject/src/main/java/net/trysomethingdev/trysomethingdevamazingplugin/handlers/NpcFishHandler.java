package net.trysomethingdev.trysomethingdevamazingplugin.handlers;

import net.kyori.adventure.text.Component;
import net.kyori.adventure.text.format.NamedTextColor;
import net.trysomethingdev.trysomethingdevamazingplugin.events.NpcFishEvent;
import org.bukkit.Bukkit;
import org.bukkit.entity.Item;
import org.bukkit.event.EventHandler;
import org.bukkit.event.Listener;

public class NpcFishHandler implements Listener {

    @EventHandler
    public void onNpcFish(final NpcFishEvent event) {
        final Item caught = event.getCaughtItem();
        Component playerName = Component.text(event.getPlayer().getName()).color(NamedTextColor.GREEN);
        Component plainText = Component.text(" was lucky and fished a ");
        Component itemName = Component.text(caught.getName()).color(NamedTextColor.AQUA);

        Component broadcastMessage = Component.text().append(playerName)
                .append(plainText)
                .append(itemName)
                .build();

        Bukkit.broadcast(broadcastMessage);
    }

}
