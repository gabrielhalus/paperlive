import styled from 'styled-components';

export const DropdownContainer = styled.div`
  position: relative;
`;

export const DropdownToggle = styled.button`
  color: inherit;
  display: flex;
  align-items: center;
  position: relative;

  &::after {
    position: absolute;
    content: '▶︎';

    right: -8px;
    top: 50%;
    transform: translateY(-50%) rotate(90deg);

    font-size: 0.6rem;
    color: inherit;
  }

  &.open::after {
    transform: translateY(-50%) rotate(-90deg);
  }
`;

export const Dropdown = styled.div`
  min-width: 200px;

  position: absolute;
  z-index: 9;
  top: ${(props) => `${props.gap}px`};

  transform: translateX(-50%);

  border-radius: 4px;
  border: 1px solid var(--black-quaternary);
  background: var(--white);
  box-shadow: 0 0 10px var(--black-quaternary);

  user-select: none;
`;

export const MenuGroup = styled.div`
  padding-block: 4px;
  font-size: 1.5rem;

  span {
    font-weight: 600;
  }

  &:not(:last-child) {
    border-bottom: 1px solid var(--black-quaternary);
  }
`;

export const MenuLabel = styled.p`
  width: 100%;
  padding: 4px 8px 4px 16px;
  color: var(--black);
`;

export const MenuButton = styled.button`
  cursor: pointer;

  width: 100%;
  padding: 4px 8px 4px 16px;

  color: var(--black);
  font-size: 1.5rem;
  text-align: start;

  &:hover {
    color: var(--white);
    background: var(--accent);
  }
`;
