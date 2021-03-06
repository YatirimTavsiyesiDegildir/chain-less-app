import React, {Component} from 'react';
import {Card, Icon, Layout, Text} from '@ui-kitten/components';
import {View} from 'react-native';

export default function QuestionScreen() {
  const [questions, changeQuestion] = React.useState([
    {
      answer1: 'Seni bir kurbağaya çeviren büyücü mü?',
      answer2: 'Yoksa seni bir fareye çeviren büyü mü?',
    },
    {
      answer1: 'Her güldüğünde osurmak mı?',
      answer2: 'Her osurduğunda yüksek sesli kahkaha atmak mı?',
    },
    {
      answer1: 'Sürekli ter kokmak mı?',
      answer2: 'Sürekli ağzının kokması mı?',
    },
    {
      answer1: 'Zengin ve çirkin mi olmak mı?',
      answer2: 'Fakir ve güzel olmak mı?',
    },
    {
      answer1: 'Görünmez olmak mı?',
      answer2: 'Uçabilmek mi?',
    },
    {
      answer1: 'Kar yağarken çıplak kalmak mı?',
      answer2: 'Adana sıcağında yün kazak giymek mi?',
    },
    {
      answer1: 'Ruh eşini her gece rüyanda görüp asla tanışamamak mı?',
      answer2:
        'Ruh eşinle tanışıp bir ay geçirdikten sonra sonsuza kadar kaybetmek mi',
    },
    {
      answer1:
        '30 yaşından itibaren fiziksel olarak yaşlanmadan 100 yaşına kadar yaşlanmak mı?',
      answer2: 'Erken yaşlanıp hayatın boyunca zihninin keskin kalması mı?',
    },
    {
      answer1: 'Hiç uyuyamamak mı?',
      answer2: 'Hiç duş almamak mı?',
    },
    {
      answer1: 'Kör olmak mı?',
      answer2: 'Sağır olmak mı?',
    },
    {
      answer1: 'Kriz anlarında sağlıklı düşünme yetisi mi?',
      answer2: 'hatasız bir yön becerisine sahip olmak mı',
    },
    {
      answer1: 'Harika bir görme yeteneği ve çarpık dişler mi?',
      answer2: 'zayıf görme yeteneği ve harika dişler mi?',
    },
    ,
  ]);
  const [chosenQuestion, changeChosenQuestion] = React.useState(0);

  const pickNewQuestion = () => {
    let newQuestionIndex = Math.floor(Math.random() * questions.length);
    changeChosenQuestion(newQuestionIndex);
  };

  return (
    <Layout
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 16,
      }}>
      <Card
        style={{
          width: '100%',
          height: '40%',
          justifyContent: 'center',
          alignItems: 'center',
          borderTopLeftRadius: 25,
          borderWidth: 2,
          borderColor: '#918980',
          borderTopRightRadius: 25,
        }}
        onPress={() => pickNewQuestion()}>
        <Text style={{textAlign: 'center'}}>
          {questions[chosenQuestion].answer1}
        </Text>
      </Card>
      <View
        style={{
          width: 80,
          height: 80,
          borderRadius: 40,
          justifyContent: 'center',
          alignItems: 'center',
          zIndex: 99,
          position: 'absolute',
          backgroundColor: '#FFF',

          shadowColor: '#000',
          shadowOffset: {
            width: 0,
            height: 1,
          },
          shadowOpacity: 0.52,
          shadowRadius: 2.22,

          elevation: 3,
        }}>
        <Icon
          style={{
            width: 60,
            height: 60,
          }}
          fill="#918980"
          name="question-mark-outline"
        />
      </View>
      <Card
        style={{
          width: '100%',
          height: '40%',
          justifyContent: 'center',
          alignItems: 'center',
          borderBottomLeftRadius: 25,
          borderBottomRightRadius: 25,
          borderWidth: 2,
          borderColor: '#918980',
        }}
        onPress={() => pickNewQuestion()}>
        <Text style={{textAlign: 'center'}}>
          {questions[chosenQuestion].answer2}
        </Text>
      </Card>
    </Layout>
  );
}
