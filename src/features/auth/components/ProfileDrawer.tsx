import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Alert, Image, Pressable, TextInput, View } from 'react-native';
import { useAuth, useUser } from '@clerk/expo';
import * as ImagePicker from 'expo-image-picker';
import {
  Drawer,
  DrawerBackdrop,
  DrawerContent,
  DrawerHeader,
  DrawerBody,
  DrawerCloseButton,
} from '@/components/ui/drawer';
import { Heading } from '@/components/ui/heading';
import { Text } from '@/components/ui/text';
import { Button, ButtonText } from '@/components/ui/button';
import { Icon, CloseIcon } from '@/components/ui/icon';

type ProfileDrawerProps = {
  isOpen: boolean;
  onClose: () => void;
  anchor?: 'left' | 'right';
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'full';
};

export function ProfileDrawer({
  isOpen,
  onClose,
  anchor = 'left',
  size = 'lg',
}: ProfileDrawerProps) {
  const { isSignedIn, signOut } = useAuth();
  const { user, isLoaded } = useUser();

  const [editing, setEditing] = useState(false);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);

  // Hidratar solo cuando llega el user — si no, los campos quedan vacíos
  // y un guardado podría borrar el nombre.
  useEffect(() => {
    if (!user) return;
    setFirstName(user.firstName ?? '');
    setLastName(user.lastName ?? '');
  }, [user]);

  // Si cierra sesión, cierra el Drawer
  useEffect(() => {
    if (isOpen && !isSignedIn) onClose();
  }, [isOpen, isSignedIn, onClose]);

  const onSaveName = async () => {
    if (!user) return;
    setSaving(true);
    try {
      await user.update({ firstName, lastName });
      setEditing(false);
    } catch (e) {
      Alert.alert('Error', 'No se pudo guardar el nombre.');
    } finally {
      setSaving(false);
    }
  };

  const onChangePhoto = async () => {
    if (!user) return;
    const perm = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!perm.granted) {
      Alert.alert('Permiso necesario', 'Activa el acceso a fotos para cambiar tu foto.');
      return;
    }
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images'],
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.75,
      base64: true,
    });
    if (result.canceled || !result.assets[0]?.base64) return;
    const asset = result.assets[0];
    const dataUrl = `data:${asset.mimeType ?? 'image/jpeg'};base64,${asset.base64}`;
    setUploading(true);
    try {
      await user.setProfileImage({ file: dataUrl });
    } catch (e) {
      Alert.alert('Error', 'No se pudo cambiar la foto.');
    } finally {
      setUploading(false);
    }
  };

  const onSignOut = async () => {
    await signOut();
    onClose();
  };

  return (
    <Drawer isOpen={isOpen} onClose={onClose} size={size} anchor={anchor}>
      <DrawerBackdrop />
      <DrawerContent className="pt-safe">
        <DrawerHeader>
          <Heading size="md" className="text-foreground font-semibold">
            Mi perfil {"  "}
          </Heading>
          <DrawerCloseButton>
            <Icon as={CloseIcon} className="stroke-foreground" size="lg" />
          </DrawerCloseButton>
        </DrawerHeader>

        <DrawerBody className="flex-1 p-4">
          {!isLoaded || !user ? (
            <Text className="text-typography-500">Inicia sesión para ver tu perfil.</Text>
          ) : (
            <View className="gap-5">
              {/* Foto + nombre */}
              <View className="items-center gap-2">
                <Pressable onPress={onChangePhoto} disabled={uploading}>
                  {user.imageUrl ? (
                    <Image
                      source={{ uri: user.imageUrl }}
                      className="h-24 w-24 rounded-full"
                    />
                  ) : (
                    <View className="h-24 w-24 items-center justify-center rounded-full bg-background-200">
                      <Text className="text-2xl font-bold">
                        {(user.firstName?.[0] ?? user.username?.[0] ?? '?').toUpperCase()}
                      </Text>
                    </View>
                  )}
                  {uploading && <ActivityIndicator className="mt-2" />}
                </Pressable>
                <Text className="text-xs text-typography-500">Toca la foto para cambiarla</Text>

                {editing ? (
                  <View className="w-full gap-2">
                    <TextInput
                      value={firstName}
                      onChangeText={setFirstName}
                      placeholder="Nombre"
                      className="rounded-lg border border-outline-200 px-3 py-2 text-typography-900"
                    />
                    <TextInput
                      value={lastName}
                      onChangeText={setLastName}
                      placeholder="Apellido"
                      className="rounded-lg border border-outline-200 px-3 py-2 text-typography-900"
                    />
                    <View className="flex-row gap-2">
                      <Button onPress={onSaveName} disabled={saving} className="flex-1">
                        <ButtonText>{saving ? 'Guardando…' : 'Guardar'}</ButtonText>
                      </Button>
                      <Button variant="outline" onPress={() => setEditing(false)} className="flex-1">
                        <ButtonText>Cancelar</ButtonText>
                      </Button>
                    </View>
                  </View>
                ) : (
                  <>
                    <Text className="text-lg font-semibold text-typography-900">
                      {user.fullName ?? user.username ?? 'Sin nombre'}
                    </Text>
                    <Button variant="outline" size="sm" onPress={() => setEditing(true)}>
                      <ButtonText>Editar nombre</ButtonText>
                    </Button>
                  </>
                )}
              </View>

              {/* Emails */}
              <View className="gap-1">
                <Text className="text-sm font-semibold text-typography-900">Correo</Text>
                {user.emailAddresses.map((e) => (
                  <View key={e.id} className="flex-row items-center justify-between">
                    <Text className="text-typography-700">{e.emailAddress}</Text>
                  </View>
                ))}
                {user.username ? (
                  <Text className="mt-2 text-typography-700">Usuario: {user.username}</Text>
                ) : null}
              </View>

              {/* Cerrar sesión */}
              <Button onPress={onSignOut}>
                <ButtonText>Cerrar sesión</ButtonText>
              </Button>
            </View>
          )}
        </DrawerBody>
      </DrawerContent>
    </Drawer>
  );
}
