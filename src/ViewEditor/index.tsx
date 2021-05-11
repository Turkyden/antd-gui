import React, { useRef } from 'react';
import { useRect } from '@reach/rect';
import { useHover } from 'ahooks';
import './index.css';

type Visibility = 'visible' | 'hidden' | 'collapse';

export interface ViewEditorProps {
  onClick: (event: React.MouseEvent) => void;
  disabled?: boolean;
  title?: string;
  children: React.FC<{ ref: React.MutableRefObject<any> }>;
}

export default ({
  disabled = false,
  title = 'edit',
  children,
  onClick,
}: ViewEditorProps) => {
  const ref = useRef(null);
  const viewEditorTitleRef = useRef(null);
  const rect = useRect(ref, { observe: true });
  const isHovering = useHover(ref);
  const isViewEditorTitleHovering = useHover(viewEditorTitleRef);

  const viewEditorStyle = {
    visibility: disabled ? 'hidden' : ('visible' as Visibility),
    width: rect?.width,
    height: rect?.height,
    top: rect?.top,
    left: rect?.left,
    border: !isViewEditorTitleHovering
      ? isHovering
        ? '2px dashed rgba(0, 0, 0, 0.5)'
        : '2px solid transparent'
      : '2px solid rgba(47, 84, 235, 0.8)',
  };

  const viewEditorTitleStyle = {
    top: rect?.top,
    left: rect?.left,
  };

  return (
    <>
      {children({ ref })}
      <div className="viewEditor" style={viewEditorStyle}>
        <span
          ref={viewEditorTitleRef}
          className="viewEditor-title"
          style={viewEditorTitleStyle}
          onClick={onClick}
        >
          {title}
        </span>
      </div>
    </>
  );
};
