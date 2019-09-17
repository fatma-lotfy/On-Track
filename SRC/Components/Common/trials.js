const ActivityCard = props => (
  <View style={ActivityCardStyles.containerStyle}>
    <View style={ActivityCardStyles.infoContainerStyle}>
      <Text style={ActivityCardStyles.titleTextStyle}>{props.title}</Text>
      <View style={ActivityCardStyles.dataContainerStyle}>
        <Text style={ActivityCardStyles.dataTextStyle}>RFIs : </Text>
        <View style={ActivityCardStyles.iconContainerStyle}>
          <Icon name="help" size={14} color="#FF000C" type="Material" />
          <Text>{props.noOfNotRepliedRFIs}</Text>
        </View>
        <View>
          <Icon name="help" size={14} color="#35A206" type="Material" />
          <Text>{props.noOfRepliedRFIs}</Text>
        </View>
      </View>
    </View>
    <View style={ActivityCardStyles.progressCircleContainerStyle}>
      <Progress.Circle
        progress={props.progress}
        size={50}
        showsText={true}
        formatText={() => {
          return props.progress + " %";
        }}
        direction="clockwise"
        strokeCap="round"
        thickness={2}
        color="#65CAB5"
        animated
      />
    </View>
  </View>
);
const ActivityCardStyles = StyleSheet.create({
  containerStyle: {
    flexDirection: "row",
    paddingHorizontal: 5,
    paddingVertical: 5
  },
  infoContainerStyle: {
    flex: 2,
    flexDirection: "column",
    justifyContent: "space-between",
    marginRight: 5
  },
  progressCircleContainerStyle: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 5
  },
  titleTextStyle: {
    fontSize: 14,
    fontWeight: "600",
    color: "#000"
  },
  dataContainerStyle: {
    flexDirection: "row",
    justifyContent: "space-between"
  },
  dataTextStyle: {
    fontSize: 10,
    color: "#000",
    fontWeight: "300"
  },
  iconContainerStyle: {
    flexDirection: "row",
    justifyContent: "space-between"
  }
});
const AccordionHeader = props => (
  <View style={AccordionHeaderStyle.containerStyle}>
    <Text style={AccordionHeaderStyle.textStyle}>{props.title}</Text>
    <Text style={AccordionHeaderStyle.numberStyle}>{props.number}</Text>
  </View>
);
const AccordionHeaderStyle = StyleSheet.create({
  containerStyle: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginHorizontal: 10
  },
  textStyle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#000"
  },
  numberStyle: {
    fontWeight: "800",
    fontSize: 20,
    color: "#000"
  }
});

const dataArray = [
  {
    title: (
      <AccordionHeader
        title="On Progress Activities"
        number={this.state.onProgressActivities.length}
      />
    ),
    content: onProgressActivities.map(activity => {
      <TouchableOpacity onPress={this.navigateToActivity}>
        <ActivityCard
          title={activity.activityName}
          noOfNotRepliedRFIs={activity.notRepliedRfis.length}
          noOfRepliedRFIs={activity.repliedRfis.length}
          progress={activity.progressRate}
        />
        ;
      </TouchableOpacity>;
    })
  },
  {
    title: (
      <AccordionHeader
        title="Pending Activities"
        number={this.state.pendingActivities.length}
      />
    ),
    content: pendingActivities.map(activity => {
      <TouchableOpacity onPress={this.navigateToActivity}>
        <ActivityCard
          title={activity.activityName}
          noOfNotRepliedRFIs={activity.notRepliedRfis.length}
          noOfRepliedRFIs={activity.repliedRfis.length}
          progress={activity.progressRate}
        />
        ;
      </TouchableOpacity>;
    })
  },
  {
    title: (
      <AccordionHeader
        title="Completed Activities"
        number={this.state.completedActivities.length}
      />
    ),
    content: completedActivities.map(activity => {
      <TouchableOpacity onPress={this.navigateToActivity}>
        <ActivityCard
          title={activity.activityName}
          noOfNotRepliedRFIs={activity.notRepliedRfis.length}
          noOfRepliedRFIs={activity.repliedRfis.length}
          progress={activity.progressRate}
        />
        ;
      </TouchableOpacity>;
    })
  }
];