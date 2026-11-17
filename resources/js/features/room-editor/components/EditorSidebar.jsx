import FurnitureCatalogPanel from '@/features/room-editor/components/FurnitureCatalogPanel';
import useEditorStore from '@/features/room-editor/store/useEditorStore';
import DangerButton from '@/shared/ui/DangerButton';
import PrimaryButton from '@/shared/ui/PrimaryButton';
import SecondaryButton from '@/shared/ui/SecondaryButton';

export default function EditorSidebar({
    furnitureCatalog,
    mode,
    setMode,
    saving,
    onSave,
    onDestroy,
}) {
    const name = useEditorStore((state) => state.name);
    const selectedId = useEditorStore((state) => state.selectedId);
    const removeItem = useEditorStore((state) => state.removeItem);

    return (
        <aside className="flex w-full shrink-0 flex-col justify-between border-b border-gray-200 bg-white lg:w-64 lg:border-b-0 lg:border-r">
            <div className="space-y-6 p-4">
                <p className="border-b border-gray-200 pb-4 text-2xl font-bold text-gray-800">
                    {name}
                </p>

                <div>
                    <h3 className="mb-3 text-2xl font-bold text-gray-800">
                        Furniture
                    </h3>
                    <div className="max-h-80 overflow-y-auto pr-1">
                        <FurnitureCatalogPanel
                            furnitureCatalog={furnitureCatalog}
                        />
                    </div>
                </div>

                <div className="border-t border-gray-200 pt-4">
                    <p className="mb-2 text-sm font-semibold uppercase tracking-wide text-gray-500">
                        Selected item
                    </p>

                    {selectedId === null ? (
                        <div className="animate-pulse space-y-2">
                            <div className="flex gap-2">
                                <div className="h-9 flex-1 rounded-md bg-gray-200" />
                                <div className="h-9 flex-1 rounded-md bg-gray-200" />
                            </div>
                            <div className="h-9 rounded-md bg-gray-200" />
                        </div>
                    ) : (
                        <>
                            <div className="flex gap-2">
                                <SecondaryButton
                                    onClick={() => setMode('translate')}
                                    className={
                                        mode === 'translate'
                                            ? 'ring-2 ring-accent-400'
                                            : ''
                                    }
                                >
                                    Move
                                </SecondaryButton>
                                <SecondaryButton
                                    onClick={() => setMode('rotate')}
                                    className={
                                        mode === 'rotate'
                                            ? 'ring-2 ring-accent-400'
                                            : ''
                                    }
                                >
                                    Rotate
                                </SecondaryButton>
                            </div>
                            <DangerButton
                                className="mt-2 w-full"
                                onClick={() => removeItem(selectedId)}
                            >
                                Remove
                            </DangerButton>
                        </>
                    )}
                </div>
            </div>

            <div className="flex flex-col gap-2 border-t border-gray-200 p-4">
                <PrimaryButton
                    disabled={saving}
                    onClick={onSave}
                    style={{ justifyContent: 'flex-start' }}
                >
                    {saving ? 'Saving...' : 'Save'}
                </PrimaryButton>
                <DangerButton
                    onClick={onDestroy}
                    style={{ justifyContent: 'flex-start' }}
                >
                    Delete
                </DangerButton>
            </div>
        </aside>
    );
}
