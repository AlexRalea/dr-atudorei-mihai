import { Box, Button, Card, Flex, Stack, Text } from '@sanity/ui';
import { useState } from 'react';
import { getPublishedId, useEditState, useFormValue, type SlugInputProps } from 'sanity';

type WithSlug = { slug?: { current?: string } } | null;

/**
 * După prima publicare, adresa paginii se blochează: schimbarea ei din greșeală
 * ar strica linkurile din Google. Se poate debloca explicit, iar la publicare
 * adresa veche este păstrată automat pentru redirecționare.
 */
export function LockedSlugInput(props: SlugInputProps) {
  const id = (useFormValue(['_id']) as string | undefined) ?? '';
  const type = useFormValue(['_type']) as string;
  const { published } = useEditState(getPublishedId(id), type);
  const [unlocked, setUnlocked] = useState(false);

  const publishedSlug = (published as WithSlug)?.slug?.current;
  const locked = Boolean(publishedSlug) && !unlocked;

  return (
    <Stack gap={3}>
      {props.renderDefault({ ...props, readOnly: props.readOnly || locked })}
      {locked && (
        <Card padding={3} radius={2} tone="primary" border>
          <Flex align="center" gap={3}>
            <Box flex={1}>
              <Text size={1}>
                Adresa este blocată pentru că pagina a fost deja publicată și poate fi deja în Google.
              </Text>
            </Box>
            <Button mode="ghost" fontSize={1} text="Schimbă adresa" onClick={() => setUnlocked(true)} />
          </Flex>
        </Card>
      )}
      {publishedSlug && unlocked && (
        <Card padding={3} radius={2} tone="caution" border>
          <Text size={1}>
            Dacă schimbați adresa, la publicare cea veche („{publishedSlug}”) va fi redirecționată automat spre cea
            nouă, ca linkurile existente să funcționeze în continuare.
          </Text>
        </Card>
      )}
    </Stack>
  );
}
