// MARK: function props
export type ActionButtonProps = {
  title: string;
  onPress: () => void;
  iconName: string;
};

// MARK: Interface
export type ITaskList = {
  id: number;
  value: string;
  isChecked: boolean;
  dateTime: string;
};
