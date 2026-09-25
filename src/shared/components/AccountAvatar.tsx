import {
  Avatar,
  AvatarFallbackText,
  AvatarImage,
} from '@/components/ui/avatar';

type AccountAvatarSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';

type AccountAvatarProps = {
  /** Nombre completo para generar las iniciales si no hay imagen */
  name: string;
  /** URL de la imagen de perfil (opcional) */
  src?: string | null;
  /** Clases de fondo para el fallback (opcional) */
  color?: string;
};

const getInitials = (fullName: string): string => {
  if (!fullName) return '';
  const names = fullName.trim().split(/\s+/);
  if (names.length === 1) return names[0].charAt(0).toUpperCase();
  return (
    names[0].charAt(0) + names[names.length - 1].charAt(0)
  ).toUpperCase();
};

export default function AccountAvatar({
  name,
  src,
  color = 'bg-blue-600',
}: AccountAvatarProps) {
  const initials = getInitials(name);

  return (
    <Avatar className={color}>
      {/* Fallback antes de la imagen (recomendado por Gluestack en iOS) */}
      <AvatarFallbackText className="text-white font-bold">
        {initials}
      </AvatarFallbackText>

      {src ? (
        <AvatarImage
          source={{ uri: src }}
          accessibilityLabel={`Foto de perfil de ${name}`}
        />
      ) : null}
    </Avatar>
  );
}
