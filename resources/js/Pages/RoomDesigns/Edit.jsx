import EditorSidebar from '@/features/room-editor/components/EditorSidebar';
import RoomCanvas from '@/features/room-editor/components/Scene/RoomCanvas';
import useCaptureThumbnail from '@/features/room-editor/hooks/useCaptureThumbnail';
import useEditorStore from '@/features/room-editor/store/useEditorStore';
import AuthenticatedLayout from '@/shared/layouts/AuthenticatedLayout';
import { Head, router } from '@inertiajs/react';
import { useEffect, useRef, useState } from 'react';

export default function Edit({ roomDesign, furnitureCatalog }) {
    const glRef = useRef();
    const captureThumbnail = useCaptureThumbnail(glRef);

    const toPayload = useEditorStore((state) => state.toPayload);
    const initialize = useEditorStore((state) => state.initialize);

    const [mode, setMode] = useState('translate');
    const [saving, setSaving] = useState(false);

    useEffect(() => {
        initialize(roomDesign);
    }, [roomDesign.id]);

    const save = () => {
        setSaving(true);

        router.put(
            route('room-designs.update', roomDesign.id),
            {
                ...toPayload(),
                thumbnail: captureThumbnail(),
            },
            {
                preserveScroll: true,
                onFinish: () => setSaving(false),
            },
        );
    };

    const destroy = () => {
        router.delete(route('room-designs.destroy', roomDesign.id));
    };

    return (
        <AuthenticatedLayout>
            <Head title={roomDesign.name} />

            <div className="flex flex-col lg:flex-row">
                <EditorSidebar
                    furnitureCatalog={furnitureCatalog}
                    mode={mode}
                    setMode={setMode}
                    saving={saving}
                    onSave={save}
                    onDestroy={destroy}
                />

                <div className="h-[60vh] overflow-hidden bg-white lg:h-auto lg:flex-1 lg:self-stretch">
                    <RoomCanvas
                        ref={glRef}
                        roomTemplate={roomDesign.room_template}
                        mode={mode}
                    />
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
