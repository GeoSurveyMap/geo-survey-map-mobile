import React from 'react';
import { View } from 'react-native';
import { useStyles } from 'react-native-unistyles';

import { GSMText } from '@/components/GSMText/GSMText';

import { stylesheet } from './FormProgressIndicator.styles';

type Props = {
  currentStage: number;
  stages: Stage[];
};

type Stage = {
  isCompleted: boolean;
};

export const FormProgressIndicator: React.FC<Props> = ({ currentStage, stages }) => {
  const { styles } = useStyles(stylesheet);
  return (
    <View style={styles.container}>
      {stages.map((stage, index) => (
        <>
          <View
            key={index}
            style={[styles.stage, stage.isCompleted && styles.completed, index === currentStage && styles.current]}
          >
            <GSMText
              style={[
                styles.stageText,
                stage.isCompleted && styles.completedText,
                index === currentStage && styles.currentText,
              ]}
            >
              {index + 1}
            </GSMText>
          </View>
          {index !== stages.length - 1 && (
            <View style={[styles.line, index <= currentStage - 1 && styles.linePrimary]} />
          )}
        </>
      ))}
    </View>
  );
};
