<template>
  <footer class="vf-o-footer clearfix">
    <vf-m-container>
      <vf-m-row class="vf-o-footer__top">
        <vf-m-col xs="12" md="6" lg="3">
          <vf-o-position name="footer1" class="mb-3 md:mb-0" />
        </vf-m-col>
        <vf-m-col xs="12" md="6" lg="3">
          <vf-o-position name="footer2" class="mb-3 md:mb-0" />
        </vf-m-col>
        <vf-m-col xs="12" md="6" lg="3">
          <vf-o-position name="footer3" class="mb-3 md:mb-0" />
        </vf-m-col>
        <vf-m-col xs="12" md="6" lg="3">
          <vf-o-position name="footer4" />
        </vf-m-col>
      </vf-m-row>
      <vf-m-row class="vf-o-footer__bottom" align-h="center">
        <vf-m-col md="6">
          <div
            class="vf-o-footer__copyright"
            v-html="$t('elements.common.footer.copyrightText')"
          />
        </vf-m-col>
      </vf-m-row>
    </vf-m-container>
  </footer>
</template>
