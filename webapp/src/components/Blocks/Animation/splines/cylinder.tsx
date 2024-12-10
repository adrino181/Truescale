type PropType = {
  y: number;
};
export const Cylinder = (props: PropType) => {
  return (
    <mesh scale-y={props.y}>
      <cylinderGeometry args={[1, 1, 1, 20]} />
      <meshStandardMaterial color="lightgreen" />
    </mesh>
  );
};
