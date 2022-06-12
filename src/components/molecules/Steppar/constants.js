import CheckboxFormatter from '../../atoms/Formatters/CheckboxFormatter';

export const SEARCH_COLUMNS = [
    {
      key: 'ALLIANCE_CODE1',
      'name': 'ALLIANCE CODE 1'
    },
    {
      key: 'ALLIANCE_CODE2',
      'name': 'ALLIANCE CODE 2'
    },
    {
      key: 'ALLIANCE_CODE3',
      'name': 'ALLIANCE CODE 3'
    },
    {
      key: 'AUTO_ADD_PROJECT_COLLECTION',
      'name': 'Auto add project Collection',
      type: 'Checkbox', 
      formatter: ({ row, ...props }) => row.AUTO_ADD_PROJECT_COLLECTION ? <CheckboxFormatter row={row} {...props} /> : null 
    },
  ]
  
 

  export const SEARCH_PROJECT_COLUMNS = [
    {
      key: 'PROJECT_NUMBER',
      'name': 'Project Number'
    },
    {
      key: 'PROJECT_NAME',
      'name': 'Project  name'
    },
    {
      key: 'STATUS',
      'name': 'Status'
    },
    {
      key: 'ROLE_NAME',
      'name': 'My role'
    }
    ,
    {
      key: 'CLIENT_NAME',
      'name': 'Client'
    },
    {
      key: 'CONTRACT_TYPE',
      'name': 'Contract type'
    },
    {
      key: 'ALLIANCE_CODE_1',
      'name': 'Alliance Code 1'
    },
    {
      key: 'ALLIANCE_CODE_2',
      'name': 'Alliance Code 2'
    },
    {
      key: 'ALLIANCE_CODE_3',
      'name': 'Alliance Code 3'
    }
  ]
  
export const formSaveData = (project,groupID, isCollectionExist, id) => {
const  insertData = {
      ...(isCollectionExist ? { "collectioN_ID": id } : {}),
      "allC_PROJ_GROUP_ID": groupID,
      "alliancE_CODE1": project.alliancE_CODE1?.join() || '',
      "alliancE_CODE2": project?.alliancE_CODE2?.join() || '',
      "alliancE_CODE3": project?.alliancE_CODE3?.join() || '',
      "projecT_ID": "",
      "autO_ADD_PROJECT_COLLECTION": project?.autO_ADD_PROJECT_COLLECTION|| '',
      "assigN_TYPE": "A",
      "addinG_SCENARION": validateScenario(project?.alliancE_CODE1,project.alliancE_CODE2,project.alliancE_CODE3),
      "addinG_LEVEL": validateAddingLevel(project?.alliancE_CODE1,project.alliancE_CODE2,project.alliancE_CODE3)
    }  
  return [insertData]
}
const validateScenario = (AC1,AC2,AC3) => {
  let addinG_SCENARION
  let addinG_SCENARION1 = [AC1,AC2,AC3].filter(AC =>AC.length)

  if((AC1.length === 1 && AC2.length === 1 && AC3.length === 1) || (addinG_SCENARION1.length === 2)) {
    addinG_SCENARION = 'G'
  }
  else if((AC1.length >= 1 && AC2.length === 0 && AC3.length === 0) || 
         (AC2.length >= 1 && AC1.length === 0 && AC3.length === 0) ||
         (AC3.length >= 1 && AC2.length === 0 && AC1.length === 0))
         {
             addinG_SCENARION = 'I'
          }
  return addinG_SCENARION
}


const validateAddingLevel = (AC1,AC2,AC3) => {
  let addinG_LEVEL
  let addinG_LEVEL1 = [AC1,AC2,AC3].filter(AC =>AC.length)

  if((AC1.length === 1 && AC2.length === 1 && AC3.length === 1) || (addinG_LEVEL1.length === 2)) {
    addinG_LEVEL = ''
  } else if(AC1.length >= 1 && AC2.length === 0 && AC3.length === 0){
    addinG_LEVEL = 'A'
  } else if(AC2.length >= 1 && AC1.length === 0 && AC3.length === 0){
    addinG_LEVEL = 'B'
  } else if(AC3.length >= 1 && AC2.length === 0 && AC1.length === 0){
    addinG_LEVEL = 'C'
  }
  return addinG_LEVEL
}
