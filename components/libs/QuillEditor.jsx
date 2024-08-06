import React, { useEffect, useRef } from 'react';
import Quill from 'quill';

const QuillEditor = ({ passText, placeholder }) => {

	const editorRef = useRef(null);

	useEffect(() => {
		const quill = new Quill(editorRef.current, {
			theme: 'snow',
			modules: {
				toolbar: [
					['bold', 'italic', 'underline', 'strike'],
					// Other options...
				],
			},
		});
		// Detect changes
		quill.on('text-change', () => {
			let content = quill.root.innerHTML;
			passText(content);
		});
		return () => {
			quill.off('text-change');
		};
	}, [passText, placeholder]);
 
	// Rendering the QuillEditor component with a reference to the DOM element
	return <div ref={editorRef} />;
};

export default QuillEditor;