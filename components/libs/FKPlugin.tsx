import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import Plugin from '@ckeditor/ckeditor5-core/src/plugin';
import ButtonView from '@ckeditor/ckeditor5-ui/src/button/buttonview';

// Custom Plugin for File Insertion
class FileInsertPlugin extends Plugin {
    init() {
        const editor = this.editor;

        editor.ui.componentFactory.add('fileInsert', locale => {
            const view = new ButtonView(locale);

            view.set({
                label: 'Insert File',
                icon: '<svg>...</svg>', // Replace with your icon SVG or text
                tooltip: true
            });

            view.on('execute', () => {
                this.editor.execute('fileInsert');
            });

            return view;
        });

        editor.commands.add('fileInsert', {
            execute: () => {
                this.editor.plugins.get('FileInsert').openModal();
            }
        });
    }
}