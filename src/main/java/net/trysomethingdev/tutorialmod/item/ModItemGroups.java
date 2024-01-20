package net.trysomethingdev.tutorialmod.item;
import net.fabricmc.fabric.api.itemgroup.v1.FabricItemGroup;
import net.fabricmc.fabric.api.object.builder.v1.block.FabricBlockSettings;
import net.minecraft.block.Block;
import net.minecraft.block.Blocks;
import net.minecraft.item.ItemGroup;
import net.minecraft.item.ItemStack;
import net.minecraft.item.Items;
import net.minecraft.registry.Registries;
import net.minecraft.registry.Registry;
import net.minecraft.text.Text;
import net.minecraft.util.Identifier;
import net.trysomethingdev.tutorialmod.TutorialMod;
import net.trysomethingdev.tutorialmod.block.ModBlocks;
import net.trysomethingdev.tutorialmod.block.custom.SoundBlock;

public class ModItemGroups {
    public static final ItemGroup RUBY_GROUP = Registry.register(Registries.ITEM_GROUP,
            new Identifier(TutorialMod.MOD_ID, "ruby"),
            FabricItemGroup.builder().displayName(Text.translatable("itemgroup.ruby"))
                    .icon(() -> new ItemStack(ModItems.RUBY)).entries((displayContext, entries) -> {
                        entries.add(ModItems.RUBY);

                        entries.add(ModItems.METAL_DETECTOR);


                        entries.add(ModBlocks.RUBY_BLOCK);
                        entries.add(ModBlocks.TRYSOMETHINGDEV_BLOCK);
                        entries.add(ModBlocks.SOUND_BLOCK);

                        entries.add(ModItems.TOMATO);
                        entries.add(ModItems.COAL_BRIQUETTE);

                    }).build());
    public static final ItemGroup ONYX_GROUP = Registry.register(Registries.ITEM_GROUP,
            new Identifier(TutorialMod.MOD_ID, "onyx"),
            FabricItemGroup.builder().displayName(Text.translatable("itemgroup.onyx"))
                    .icon(() -> new ItemStack(ModItems.ONYX)).entries((displayContext, entries) -> {
                        entries.add(ModItems.ONYX);

                    }).build());

    public static final ItemGroup PEA_GROUP = Registry.register(Registries.ITEM_GROUP,
            new Identifier(TutorialMod.MOD_ID, "pea"),
            FabricItemGroup.builder().displayName(Text.translatable("itemgroup.pea"))
                    .icon(() -> new ItemStack(ModItems.ONYX)).entries((displayContext, entries) -> {
                        entries.add(ModItems.ONYX);

                    }).build());
    public static void registerItemGroups() {
        TutorialMod.LOGGER.info("Registering Item Groups for " + TutorialMod.MOD_ID);
    }
}
